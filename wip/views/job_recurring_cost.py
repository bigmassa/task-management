from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.views.generic import UpdateView

from wip.forms.job_recurring_cost import JobRecurringCostFormSet
from wip.models import Job


class JobRecurringCostUpdate(LoginRequiredMixin, UpdateView):
    fields = []
    formset_class = JobRecurringCostFormSet
    model = Job
    success_message = "Updated successfully"
    template_name = 'wip/jobrecurringcost_update.html'

    def get_formset(self, **kwargs):
        return self.formset_class(**kwargs)

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        formset = self.get_formset(instance=self.object)
        context = self.get_context_data(formset=formset)
        return self.render_to_response(context)

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        formset = self.get_formset(data=request.POST, instance=self.object)
        if formset.is_valid():
            return self.form_valid(formset)
        else:
            return self.form_invalid(formset)

    def form_valid(self, formset):
        formset.instance = self.object
        formset.save()
        messages.success(self.request, self.success_message)
        return HttpResponseRedirect(self.get_success_url())

    def form_invalid(self, formset):
        context = self.get_context_data(formset=formset)
        return self.render_to_response(context)

    def get_success_url(self):
        return self.object.get_absolute_url()

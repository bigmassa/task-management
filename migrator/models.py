from django.db import models


class Client(models.Model):
    clientid = models.AutoField(db_column='ClientID', primary_key=True)
    clientname = models.CharField(db_column='ClientName', max_length=50, blank=True, null=True)
    clientphone = models.CharField(db_column='ClientPhone', max_length=50, blank=True, null=True)
    clientemail = models.CharField(db_column='ClientEmail', max_length=50, blank=True, null=True)
    clientwebsite = models.CharField(db_column='ClientWebsite', max_length=50, blank=True, null=True)
    clientnotes = models.TextField(db_column='ClientNotes', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Client'


class Contact(models.Model):
    contactid = models.AutoField(db_column='ContactID', primary_key=True)
    contactname = models.CharField(db_column='ContactName', max_length=50, blank=True, null=True)
    contactphone = models.CharField(db_column='ContactPhone', max_length=50, blank=True, null=True)
    contactemail = models.CharField(db_column='ContactEmail', max_length=50, blank=True, null=True)
    clientid = models.ForeignKey(Client, models.DO_NOTHING, db_column='ClientID', blank=True, null=True)
    contactnotes = models.TextField(db_column='ContactNotes', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Contact'


class Entry(models.Model):
    entryid = models.AutoField(db_column='EntryID', primary_key=True)
    comment = models.CharField(max_length=2000, blank=True, null=True)
    started_at = models.TimeField()
    ended_at = models.TimeField()
    date = models.DateField()
    taskid = models.ForeignKey('Task', models.DO_NOTHING, db_column='TaskID', blank=True, null=True)
    staffid = models.ForeignKey('Staff', models.DO_NOTHING, db_column='StaffID')
    jobid = models.IntegerField(db_column='JobID', blank=True, null=True)
    worksheetcodeid = models.ForeignKey('Worksheetcode', models.DO_NOTHING, db_column='WorkSheetCodeID', blank=True,
                                        null=True)

    class Meta:
        managed = False
        db_table = 'Entry'
        unique_together = (('staffid', 'entryid'),)


class Job(models.Model):
    jobid = models.AutoField(db_column='JobID', primary_key=True)
    jobtitle = models.CharField(db_column='JobTitle', max_length=125, blank=True, null=True)
    jobdesc = models.TextField(db_column='JobDesc', blank=True, null=True)
    jobstatusid = models.ForeignKey('Jobstatus', models.DO_NOTHING, db_column='JobStatusID', blank=True, null=True)
    clientid = models.ForeignKey(Client, models.DO_NOTHING, db_column='ClientID', blank=True, null=True)
    jobnumber = models.IntegerField(db_column='JobNumber', blank=True, null=True)
    jobstartdate = models.DateTimeField(db_column='JobStartDate', blank=True, null=True)
    jobtype = models.IntegerField(db_column='JobType', blank=True, null=True)
    jobnotes = models.TextField(db_column='JobNotes', blank=True, null=True)
    backgroundyn = models.BooleanField(db_column='BackgroundYN', blank=True, null=True)
    estimatedtime = models.CharField(db_column='estimatedTime', max_length=20, blank=True, null=True)
    jobcolour = models.CharField(db_column='JobColour', max_length=7)
    ismaintenance = models.BooleanField(db_column='IsMaintenance')
    billedto = models.DateTimeField(db_column='BilledTo', blank=True, null=True)
    managerid = models.IntegerField(db_column='ManagerID', blank=True, null=True)
    jobleadid = models.IntegerField(db_column='JobLeadID', blank=True, null=True)
    backgrounduntil = models.DateTimeField(db_column='BackgroundUntil', blank=True, null=True)
    lastbilldatebeforejune = models.DateTimeField(db_column='LastBillDateBeforeJune', blank=True, null=True)
    firstbilldateafterjune = models.DateTimeField(db_column='FirstBillDateAfterJune', blank=True, null=True)
    lastbillamount = models.IntegerField(db_column='LastBillAmount', blank=True, null=True)
    isstagedpayments = models.BooleanField(db_column='IsStagedPayments')

    class Meta:
        managed = False
        db_table = 'Job'


class Jobbilling(models.Model):
    jobnumber = models.IntegerField(db_column='JobNumber', primary_key=True)
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)
    client = models.CharField(db_column='Client', max_length=255, blank=True, null=True)
    startdate = models.DateField(db_column='StartDate', blank=True, null=True)
    enddate = models.DateField(db_column='EndDate', blank=True, null=True)
    billed = models.DecimalField(db_column='Billed', max_digits=19, decimal_places=4, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'JobBilling'


class Jobstatus(models.Model):
    jobstatusid = models.AutoField(db_column='JobStatusID', primary_key=True)
    jobstatustitle = models.CharField(db_column='JobStatusTitle', max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'JobStatus'


class Jobtransaction(models.Model):
    jobnumber = models.IntegerField(db_column='JobNumber')
    quantity = models.DecimalField(db_column='Quantity', max_digits=18, decimal_places=0, blank=True, null=True)
    resourcecode = models.CharField(db_column='ResourceCode', max_length=10, blank=True, null=True)
    entrydate = models.DateField(db_column='EntryDate', blank=True, null=True)
    value = models.DecimalField(db_column='Value', max_digits=10, decimal_places=4, blank=True, null=True)
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'JobTransaction'


class Jobtype(models.Model):
    jobtypeid = models.IntegerField(db_column='JobTypeID', primary_key=True)
    jobtypetitle = models.CharField(db_column='JobTypeTitle', max_length=64)

    class Meta:
        managed = False
        db_table = 'JobType'


class Project(models.Model):
    local_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    extended_name = models.TextField(blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    parent_local_id = models.IntegerField()
    staffid = models.ForeignKey('Staff', models.DO_NOTHING, db_column='StaffID')

    class Meta:
        managed = False
        db_table = 'Project'
        unique_together = (('staffid', 'local_id'),)


class Staff(models.Model):
    staffid = models.AutoField(db_column='StaffID', primary_key=True)
    staffname = models.CharField(db_column='StaffName', max_length=125, blank=True, null=True)
    currentyn = models.BooleanField(db_column='CurrentYN', blank=True, null=True)
    staffnotes = models.TextField(db_column='StaffNotes', blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=100, blank=True, null=True)
    greeting = models.CharField(db_column='Greeting', max_length=25, blank=True, null=True)
    signoff = models.CharField(db_column='SignOff', max_length=55, blank=True, null=True)
    staffinitials = models.CharField(db_column='StaffInitials', max_length=4, blank=True, null=True)
    password = models.BinaryField(blank=True, null=True)
    reset_ref = models.BinaryField(blank=True, null=True)
    salt = models.TextField(blank=True, null=True)
    reset_ref_expiry = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Staff'


class Task(models.Model):
    taskid = models.AutoField(db_column='TaskID', primary_key=True)
    jobid = models.ForeignKey(Job, models.DO_NOTHING, db_column='JobID', blank=True, null=True)
    staffid = models.IntegerField(db_column='StaffID', blank=True, null=True)
    title = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    tasktargetdate = models.DateTimeField(db_column='TaskTargetDate', blank=True, null=True)
    taskpriority = models.IntegerField(db_column='TaskPriority', blank=True, null=True)
    is_closed = models.BooleanField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    tasktargethours = models.CharField(db_column='TaskTargetHours', max_length=50, blank=True, null=True)
    taskbackgroundyn = models.BooleanField(db_column='TaskBackgroundYN', blank=True, null=True)
    taskstartdate = models.DateTimeField(db_column='TaskStartDate', blank=True, null=True)
    taskbackgrounduntil = models.DateTimeField(db_column='TaskBackgroundUntil', blank=True, null=True)
    taskaddedby = models.ForeignKey(Staff, models.DO_NOTHING, db_column='TaskAddedBy', blank=True, null=True)
    taskstatusid = models.ForeignKey('Taskstatus', models.DO_NOTHING, db_column='TaskStatusId', blank=True, null=True)
    display_order = models.IntegerField(blank=True, null=True)
    complete_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Task'


class Taskstatus(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    description = models.CharField(max_length=200)
    display_order = models.IntegerField()
    is_terminal = models.BooleanField()
    is_transitional = models.BooleanField()
    is_indefinite = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'TaskStatus'


class Worksheetcode(models.Model):
    codeid = models.AutoField(db_column='CodeID', primary_key=True)
    codeinitials = models.CharField(db_column='CodeInitials', max_length=50, blank=True, null=True)
    codedesc = models.CharField(db_column='CodeDesc', max_length=255, blank=True, null=True)
    codeincludes = models.TextField(db_column='CodeIncludes', blank=True, null=True)
    codecategoryid = models.ForeignKey('Worksheetcodecategory', models.DO_NOTHING, db_column='CodeCategoryID',
                                       blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'WorkSheetCode'


class Worksheetcodecategory(models.Model):
    codecategoryid = models.AutoField(db_column='CodeCategoryID', primary_key=True)
    codecategoryname = models.CharField(db_column='CodeCategoryName', max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'WorksheetCodeCategory'


class Migrationhistory(models.Model):
    migrationid = models.CharField(db_column='MigrationId', primary_key=True, max_length=150)
    contextkey = models.CharField(db_column='ContextKey', max_length=300)
    model = models.BinaryField(db_column='Model')
    productversion = models.CharField(db_column='ProductVersion', max_length=32)

    class Meta:
        managed = False
        db_table = '__MigrationHistory'
        unique_together = (('migrationid', 'contextkey'),)


class Days(models.Model):
    entry_date = models.DateField(blank=True, null=True)
    staffid = models.IntegerField(db_column='StaffID')
    complete = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'days'

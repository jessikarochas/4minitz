
import { MeetingSeries } from './../../imports/meetingseries'


Template.meetingSeriesEdit.helpers({
 //add you helpers here
});

Template.meetingSeriesEdit.events({

    "click #deleteMeetingSeries": function() {
        console.log("Remove Meeting Series: "+this._id);
        $('#dlgEditMeetingSeries').modal('hide');   // hide underlying modal dialog first, otherwise transparent modal layer is locked!

        let ms = new MeetingSeries(this._id);
        let countMinutes = ms.countMinutes();
        let seriesName = "<strong>" + ms.project + ": " + ms.name + "</strong>";
        let dialogContent = "<p>Do you really want to delete the meeting series " + seriesName + "?</p>";
        if (countMinutes !== 0) {
            let lastMinDate = ms.lastMinutes().date;
            dialogContent += "<p>This series contains " + countMinutes
                + " meeting minutes (last minutes of " + lastMinDate + ").</p>";
        }

        confirmationDialog(
            /* callback called if user wants to continue */
            () => {
                MeetingSeries.remove(ms);
                Router.go("/");
            },
            dialogContent
        );
    },
    
    
    "click #btnMeetingSeriesSave": function (evt, tmpl) {
        evt.preventDefault();

        var aProject = tmpl.find("#id_meetingproject").value;
        var aName = tmpl.find("#id_meetingname").value;

        // validate form and show errors
        let projectNode = tmpl.$("#id_meetingproject");
        let nameNode = tmpl.$("#id_meetingname");
        projectNode.parent().removeClass("has-error");
        nameNode.parent().removeClass("has-error");
        if (aProject == "") {
            projectNode.parent().addClass("has-error");
            projectNode.focus();
            return;
        }
        if (aName == "") {
            nameNode.parent().addClass("has-error");
            nameNode.focus();
            return;
        }

        ms = new MeetingSeries(this._id);
        ms.project = aProject;
        ms.name = aName;
        ms.save();

        // Hide modal dialog
        $('#dlgEditMeetingSeries').modal('hide');
    }
});

Template.meetingSeriesEdit.onCreated(function() {
    //add your statement here
});

Template.meetingSeriesEdit.onRendered(function() {
    //add your statement here
});

Template.meetingSeriesEdit.onDestroyed(function() {
    //add your statement here
});


import { E2EGlobal } from './helpers/E2EGlobal'
import { E2EApp } from './helpers/E2EApp'
import { E2EMeetingSeries } from './helpers/E2EMeetingSeries'
import { E2EMinutes } from './helpers/E2EMinutes'
import { E2ETopics } from './helpers/E2ETopics'

describe('MyActionItems Tab', function () {
    const aProjectName = "MyActionItems Tab";
    let aMeetingCounter = 0;
    let aMeetingNameBase = "Meeting Name #";

    before("reload page and reset app", function () {
        E2EGlobal.logTimestamp("Start test suite");
        E2EApp.resetMyApp(true);
        E2EApp.launchApp();
    });

    beforeEach("goto start page and make sure test user is logged in", function () {
        E2EApp.gotoStartPage();
        expect(E2EApp.isLoggedIn()).to.be.true;
    });

    // **************
    // ATTENTION!
    // This test case has expected side effect to next test case!
    // **************
    it("can filter my action items from all meeting series", function () {
        this.timeout(150000);

        let meetingName = aMeetingNameBase + '1';
        E2EMeetingSeries.createMeetingSeries(aProjectName, meetingName);

        E2EMinutes.addMinutesToMeetingSeries(aProjectName, meetingName);
        E2ETopics.addTopicToMinutes('topic #1');
        E2ETopics.addInfoItemToTopic({subject: 'action item #1', itemType: "actionItem", responsible: E2EApp.getCurrentUser()}, 1);
        E2EMinutes.finalizeCurrentMinutes();

        E2EMinutes.addMinutesToMeetingSeries(aProjectName, meetingName);
        E2ETopics.addTopicToMinutes('topic #2');
        E2ETopics.addInfoItemToTopic({subject: 'action item #2', itemType: "actionItem", responsible: E2EApp.getCurrentUser()}, 1);
        E2ETopics.toggleActionItem(1, 1);
        E2EMinutes.finalizeCurrentMinutes();

        meetingName = aMeetingNameBase + '2';
        E2EMeetingSeries.createMeetingSeries(aProjectName, meetingName);

        E2EMinutes.addMinutesToMeetingSeries(aProjectName, meetingName);
        E2ETopics.addTopicToMinutes('topic #3');
        E2ETopics.addInfoItemToTopic({subject: 'action item #3', itemType: "actionItem", responsible: E2EApp.getCurrentUser()}, 1);
        E2EMinutes.finalizeCurrentMinutes();

        E2EMinutes.addMinutesToMeetingSeries(aProjectName, meetingName);
        E2ETopics.addTopicToMinutes('topic #4');
        E2ETopics.addInfoItemToTopic({subject: 'action item #4', itemType: "actionItem", responsible: E2EApp.getCurrentUser()}, 1);
        E2EMinutes.finalizeCurrentMinutes();

        E2EApp.gotoStartPage();
        E2EApp.gotoActionItemsTab();

        expect(E2ETopics.countItemsForTopic('#itemPanel'), "Items list should have three items").to.equal(3);
    });

    it("can filter my action items from all action items", function () {
        let meetingName = aMeetingNameBase + '3';
        E2EMeetingSeries.createMeetingSeries(aProjectName, meetingName);

        E2EMinutes.addMinutesToMeetingSeries(aProjectName, meetingName);
        E2ETopics.addTopicToMinutes('topic #5');
        E2ETopics.addInfoItemToTopic({subject: 'action item #5', itemType: "actionItem", responsible: (E2EApp.getCurrentUser() + ',' + E2EGlobal.SETTINGS.e2eTestUsers[1])}, 1);
        E2ETopics.addInfoItemToTopic({subject: 'action item #6', itemType: "actionItem", responsible: E2EGlobal.SETTINGS.e2eTestUsers[1]}, 1);
        E2EMinutes.finalizeCurrentMinutes();

        E2EApp.gotoStartPage();
        E2EApp.gotoActionItemsTab();

        expect(E2ETopics.countItemsForTopic('#itemPanel'), "Items list should have four items").to.equal(4);
    });
});
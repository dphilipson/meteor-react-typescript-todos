/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  export interface TaskDAO {
    _id?: string;
    text: string;
    createdAt: Date;
    checked: boolean;
    owner: string;
    username: string;
  }

  export const Tasks = new Mongo.Collection<TaskDAO>("tasks");

  if (Meteor.isClient) {
    // This code is executed on client only
    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

    Meteor.startup(() => {
      ReactDOM.render(<App />, document.getElementById("render-target"));
    });
  }

  Meteor.methods({
    addTask(text: string) {
      // Make sure the user is logged in before inserting a task
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Tasks.insert({
        text: text,
        createdAt: new Date(),
        checked: false,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    },

    removeTask(taskId: string) {
      Tasks.remove(taskId);
    },

    setChecked(taskId: string, setChecked: boolean) {
      Tasks.update(taskId, { $set: { checked: setChecked } });
    }
  });
}

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
    private: boolean;
  }

  export const Tasks = new Mongo.Collection<TaskDAO>("tasks");

  if (Meteor.isClient) {
    // This code is executed on client only
    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

    Meteor.subscribe("tasks");

    Meteor.startup(() => {
      ReactDOM.render(<App />, document.getElementById("render-target"));
    });
  }

  if (Meteor.isServer) {
    Meteor.publish("tasks", function() {
      return Tasks.find({
        $or: [
          { private: { $ne: true } },
          { owner: this.userId }
        ]
      });
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
        username: Meteor.user().username,
        private: false
      });
    },

    removeTask(taskId: string) {
      const task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private, make sure only the owner can delete it
        throw new Meteor.Error("not-authorized");
      }

      Tasks.remove(taskId);
    },

    setChecked(taskId: string, setChecked: boolean) {
      const task = Tasks.findOne(taskId);
      if (task.private && task.owner !== Meteor.userId()) {
        // If the task is private make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }

      Tasks.update(taskId, { $set: { checked: setChecked } });
    },

    setPrivate(taskId: string, setToPrivate: boolean) {
      const task = Tasks.findOne(taskId);

      // Make sure only the task owner can make a task private
      if (task.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }

      Tasks.update(taskId, { $set: { private: setToPrivate } });
    }
  });
}

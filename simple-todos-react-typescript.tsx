/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  export interface TaskDAO {
    _id?: number;
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
}

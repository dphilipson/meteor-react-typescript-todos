/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  export interface TaskDAO {
    _id?: number;
    text: string;
    createdAt: Date;
  }

  export const Tasks = new Mongo.Collection<TaskDAO>("tasks");

  if (Meteor.isClient) {
    // This code is executed on client only

    Meteor.startup(() => {
      ReactDOM.render(<App />, document.getElementById("render-target"));
    });
  }
}

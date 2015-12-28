/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  if (Meteor.isClient) {
    // This code is executed on client only

    Meteor.startup(() => {
      ReactDOM.render(<App />, document.getElementById("render-target"));
    });
  }
}

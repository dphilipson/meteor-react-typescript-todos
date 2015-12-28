/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  export class MeteorComponent<P, S, D> extends React.Component<P, S> {
    public data: D;

    public getMeteorData(): D {
      throw new Error("MeteorComponent subclass must implement getMeteorData()");
    }
  }
}

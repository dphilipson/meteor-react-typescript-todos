/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  export class AccountsUiWrapper extends React.Component<{}, {}> {
    private view: Blaze.View;

    public componentDidMount(): void {
      // Use Meteor Blaze to render login buttons
      this.view = Blaze.render(Template["loginButtons"], this.refs["container"] as Element);
    }

    public componentWillUnmount(): void {
      // Clean up Blaze view
      Blaze.remove(this.view);
    }

    public render(): JSX.Element {
      // Just render a placeholder container that will be filled in
      return <span ref="container" />;
    }
  }
}

/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  // Task component - represents a single todo item
  export interface TaskProps {
    task: TaskDAO;
  }

  export class Task extends React.Component<TaskProps, {}> {
    public render(): JSX.Element {
      return (
        <li>{this.props.task.text}</li>
      );
    }
  }
}

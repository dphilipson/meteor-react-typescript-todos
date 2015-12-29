/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  // Task component - represents a single todo item
  export interface TaskProps {
    task: TaskDAO;
  }

  export class Task extends React.Component<TaskProps, {}> {
    private toggleChecked(): void {
      // Set the checked property to the opposite of its current value
      Tasks.update(this.props.task._id, {
        $set: { checked: !this.props.task.checked }
      });
    }

    private deleteThisTask() {
      Tasks.remove(this.props.task._id);
    }

    public render(): JSX.Element {
      // Give tasks a different className when they are checked off,
      // so that we can style them nicely in CSS
      const taskClassName = this.props.task.checked ? "checked" : "";

      return (
        <li className={taskClassName}>
          <button className="delete" onClick={this.deleteThisTask.bind(this)}>
            &times;
          </button>

          <input
            type="checkbox"
            readOnly={true}
            checked={this.props.task.checked}
            onClick={this.toggleChecked.bind(this)} />

          <span className="text">{this.props.task.text}</span>
        </li>
      );
    }
  }
}

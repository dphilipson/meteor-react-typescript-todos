/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  // Task component - represents a single todo item
  export interface TaskProps {
    task: TaskDAO;
    showPrivateButton: boolean;
  }

  export class Task extends React.Component<TaskProps, {}> {
    private toggleChecked(): void {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);

    }

    private deleteThisTask(): void {
      Meteor.call("removeTask", this.props.task._id);
    }

    private togglePrivate(): void {
      Meteor.call("setPrivate", this.props.task._id, !this.props.task.private);
    }

    public render(): JSX.Element {
      // Give tasks a different className when they are checked off,
      // so that we can style them nicely in CSS
      // Add "checked" and/or "private" to the className when needed
      const checkedClassName = this.props.task.checked ? "checked" : "";
      const privateClassName = this.props.task.private ? "private" : "";
      const taskClassName = `${checkedClassName} ${privateClassName}`;

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

            { this.props.showPrivateButton ? (
              <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                { this.props.task.private ? "Private" : "Public" }
              </button>
            ) : ""}

          <span className="text">
            <strong>{this.props.task.username}</strong>: {this.props.task.text}
          </span>
        </li>
      );
    }
  }
}

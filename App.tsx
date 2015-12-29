/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  // App component - represents the whole App
  interface AppState {
    hideCompleted: boolean;
  }

  interface AppData {
    tasks: TaskDAO[];
    incompleteCount: number;
  }

  @reactMixin.decorate(ReactMeteorData)
  export class App extends MeteorComponent<{}, AppState, AppData> {
    public constructor(props?: {}, context?: any) {
      super(props, context);
      this.state = { hideCompleted: false};
    }

    public getMeteorData(): AppData {
      let query: Mongo.Selector = {};
      if (this.state.hideCompleted) {
        // If hide completed is checked, filter tasks
        query = { checked: { $ne: true } };
      }
      return {
        tasks: Tasks.find(query, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
      };
    }

    private renderTasks(): JSX.Element[] {
      // Get tasks from this.data.tasks
      return this.data.tasks.map((task) => {
        return <Task key={task._id} task={task} />;
      });
    }

    private handleSubmit(event: React.FormEvent): void {
      event.preventDefault();

      // Find the text field via the React ref
      const inputElement = this.refs["textInput"] as HTMLInputElement;
      const text = inputElement.value.trim();

      Tasks.insert({
        text: text,
        createdAt: new Date(), // current time
        checked: false
      });

      // Clear form
      inputElement.value = "";
    }

    private toggleHideCompleted(): void {
      this.setState({
        hideCompleted: !this.state.hideCompleted
      });
    }

    public render(): JSX.Element {
      return (
        <div className="container">
          <header>
            <h1>Todo List ({this.data.incompleteCount})</h1>
            <label className="hide-completed">
              <input
                  type="checkbox"
                  readOnly={true}
                  checked={this.state.hideCompleted}
                  onClick={this.toggleHideCompleted.bind(this)} />
              Hide Completed Tasks
            </label>
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new tasks" />
            </form>
          </header>
          <ul>
            {this.renderTasks()}
          </ul>
        </div>
      );
    }
  }
}

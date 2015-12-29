/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  // App component - represents the whole App
  interface AppData {
    tasks: TaskDAO[];
  }

  @reactMixin.decorate(ReactMeteorData)
  export class App extends MeteorComponent<{}, {}, AppData> {
    public getMeteorData(): AppData {
      return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
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
        createdAt: new Date() // current time
      });

      // Clear form
      inputElement.value = "";
    }

    public render(): JSX.Element {
      return (
        <div className="container">
          <header>
            <h1>Todo List</h1>
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

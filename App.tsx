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
        tasks: Tasks.find({}).fetch()
      };
    }

    private renderTasks(): JSX.Element[] {
      // Get tasks from this.data.tasks
      return this.data.tasks.map((task) => {
        return <Task key={task._id} task={task} />;
      });
    }

    public render(): JSX.Element {
      return (
        <div className="container">
          <header>
            <h1>Todo List</h1>
          </header>

          <ul>
            {this.renderTasks()}
          </ul>
        </div>
      );
    }
  }
}

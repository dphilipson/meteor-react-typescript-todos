/* tslint:disable:no-eval */
eval(namespaceEvalHack("Todos"));
/* tslint:enable:no-eval */

namespace Todos {
  export interface TaskDAO {
    _id: number;
    text: string;
  }

  // App component - represents the whole App
  export class App extends React.Component<{}, {}> {
    private getTasks(): TaskDAO[] {
      return [
        { _id: 1, text: "This is task 1" },
        { _id: 2, text: "This is task 2" },
        { _id: 3, text: "This is task 3" }
      ];
    }

    private renderTasks(): JSX.Element[] {
      return this.getTasks().map((task) => {
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

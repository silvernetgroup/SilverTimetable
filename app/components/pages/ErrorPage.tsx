import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import * as React from "react";
import PullRefresh from "react-pullrefresh";

interface IProps {
  onTimetableRefresh(): void;
}

export default class ErrorPage extends React.Component<IProps> {
  public render(): JSX.Element {
    return(
      <div className="ErrorPage">
        <PullRefresh onRefresh={() => this.props.onTimetableRefresh()} style={{position: "relative"}}>
          <Paper elevation={4}>
            <Typography type="headline" component="h3">
              Brak połączenia z serwerem
            </Typography>
            <Typography>
              Nie udało się pobrać aktualnej wersji planu.
              Żadna wersja nie znajduje się w pamięci urządzenia.
            </Typography>
          </Paper>
        </PullRefresh>
      </div>
    );
  }
}

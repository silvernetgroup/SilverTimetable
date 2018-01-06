import Paper from "material-ui/Paper";
import * as React from "react";
import IconHelper from "./settingsComponents/IconHelper";
import Menu, {MenuItem} from "material-ui/Menu";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "material-ui/Dialog";
import Button from "material-ui/Button/Button";
import { ListItemIcon } from "material-ui";
import ListItemText from "material-ui/List/ListItemText";
import ITimetableEvent from "../models/ITimetableEvent";

interface IProps {
    name: string;
    info: string;
}

export default class EventBlockMenu extends React.Component<IProps, {}> {
    public state = {
        anchorEl: null,
        open: false,
        infoOpen: false,
    };

    public handleOpenMenu = (event) => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    }

    public handleTmp = () => {
        this.setState({ open: false });
    }

    public handleOpenInfo = () => {
        this.setState({infoOpen: true, open: false });
    }

    public handleCloseInfo = () => {
        this.setState({infoOpen: false });
    }

    public infoMenu = (info: string) => {
        if (info === "") {return; } else {
            return (
                <MenuItem onClick={this.handleOpenInfo}>
                    <ListItemIcon>
                        <IconHelper iconName="InfoOutline" />
                    </ListItemIcon>
                    <ListItemText primary="Więcej informacji">
                    </ListItemText>
                </MenuItem>
            );
        }

    }

    public render(): JSX.Element {

        const style: any = {
            float: "right",
        };

        return (
            <div style={style}>
                <div onClick={this.handleOpenMenu} >
                <IconHelper iconName="MoreHoriz" />
                </div>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                >
                    {this.infoMenu(this.props.info)}
                    <MenuItem onClick={this.handleTmp}>
                        <ListItemIcon>
                            <IconHelper iconName="Map" />
                        </ListItemIcon>
                        <ListItemText primary="Sala">
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={this.handleTmp}>
                        <ListItemIcon>
                            <IconHelper iconName="Link" />
                        </ListItemIcon>
                        <ListItemText primary="Prowadzący">
                        </ListItemText>
                    </MenuItem>
                </Menu>
                <Dialog
                    open={this.state.infoOpen}
                >
                    <DialogTitle>{this.props.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.info}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleCloseInfo}>kk</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

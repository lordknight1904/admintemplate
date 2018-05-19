import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import { withRouter } from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Button from "../../components/CustomButtons/Button";
import { createAdmin } from '../../reducers/admin';
import { bindActionCreators } from "redux";
import { LinearProgress } from "material-ui";
import { setEdit } from '../../reducers/admin';

class Edit extends Component {
  state = {
    isSubmitting: false,
    username: '',
    oldPassword: '',
    password: '',
    role: '',
    _id: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.admin.edit.hasOwnProperty('username') && prevState.username !== nextProps.admin.edit.username) {
      return {
        username: nextProps.admin.edit.username,
        _id: nextProps.admin._id,
        oldPassword: '',
        password: '',
        role: nextProps.admin.edit.role.name,
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = () => {
    const { username, password, role } = this.state;
    const Role = this.props.role.role.find(r => r.name === role);
    this.setState({ isSubmitting: true });
    const admin = {
      username,
      password,
      role: Role ? Role._id : undefined,
    };
    this.props.createAdmin(admin).then(res => {
      if (!res.hasOwnProperty('error')) {
        this.setState({
          isSubmitting: false,
          username: '',
          password: '',
          role: '',
        });
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };

  componentWillUnmount() {
    this.props.setEdit({});
  }
  render() {
    const { role, admin } = this.props;
    return (
      <div>
        {
          (admin.edit.hasOwnProperty('username')) ? (
            <div>
              <RegularCard
                cardTitle="Edit Admin"
                cardSubtitle="Modify the details"
                content={
                  <div>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Username"
                          id="username"
                          name="username"
                          onChange={this.handleChange}
                          inputProps={{
                            value: this.state.username,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomSelect
                          value={this.state.role}
                          onChange={this.handleChange}
                          id="role"
                          name="role"
                          labelText="Role"
                          data={role.role}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Old Password"
                          id="oldPassword"
                          name="oldPassword"
                          onChange={this.handleChange}
                          inputProps={{
                            value: this.state.oldPassword,
                            type: "password",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="New Password"
                          id="newPassword"
                          name="password"
                          onChange={this.handleChange}
                          inputProps={{
                            value: this.state.password,
                            type: "password",
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                  </div>
                }
                footer={<Button color="primary" disabled={this.state.isSubmitting}
                                onClick={this.onSubmit}>Submit</Button>}
              />
            </div>
          ) : <LinearProgress color="secondary" variant="indeterminate" />
        }
      </div>
    )
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app, role, admin }) => ({
  app,
  role,
  admin,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createAdmin,
      setEdit
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Edit)));

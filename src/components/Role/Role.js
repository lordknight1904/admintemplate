import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import { withRouter } from 'react-router'
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import Table from "../../components/Table/Table";
import ItemGrid from "../../components/Grid/ItemGrid";

class Role extends Component {
  render() {
    const { role } = this.props;
    const data = role.role.map(r => {
      return [r.name, moment(r.dateCreated).format('MMMM Do YYYY, h:mm')]
    });
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Role"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Date Created"]}
                tableData={data}
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

Role.propTypes = {
  classes: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app, role }) => ({
  role,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(withRouter(Role)));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from 'material-ui';
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import Table from "../../components/Table/Table";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomButton from '../CustomButtons/Button';
import { bindActionCreators } from "redux";
import moment from "moment/moment";

class Admin extends Component {
  render() {
    const { admin } = this.props;
    const data = admin.admin.map(ad => {
      return [ad.username, ad.role.name, moment(ad.dateCreated).format('MMMM Do YYYY, h:mm')]
    });
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Admin"
            cardAction={
              <Link to={`${this.props.location.pathname}/add`} style={{ textDecoration: 'none' }}>
                <CustomButton color="rose">
                  New
                </CustomButton>
              </Link>
            }
            // cardSubtitle="Here is a subtitle for this table"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={["Username", "Role", "Date Created"]}
                tableData={data}
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = ({ admin }) => ({
  admin,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(withRouter(Admin)));

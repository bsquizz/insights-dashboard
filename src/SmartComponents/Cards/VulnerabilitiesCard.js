import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardFooter, CardHeader,
    Grid, GridItem,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

/**
 * Vulnerabilities Card
 */
class VulnerabilitiesCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchVulnerabilities();
    }

    componentDidUpdate (prevProps) {
        if (this.props.vulnerabilities !== prevProps.vulnerabilities) {
            const vulnProps = this.props.vulnerabilities;
            this.setState({ total: vulnProps.meta.total_items });
        }
    }

    render() {
        const {
            vulnerabilitiesFetchStatus
        } = this.props;

        return (
            <Card>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Vulnerabilities</Title>
                </CardHeader>
                <CardBody>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        { vulnerabilitiesFetchStatus === 'fulfilled' && (
                            <React.Fragment>
                                <GridItem><p>icon</p></GridItem>
                                <GridItem>{ this.state.total }</GridItem>
                                <GridItem>Critical</GridItem>
                            </React.Fragment>
                        ) } { vulnerabilitiesFetchStatus === 'pending' && ( <Loading /> ) }
                    </Grid>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        <GridItem><p>icon</p></GridItem>
                        <GridItem>40</GridItem>
                        <GridItem>CVEs added in the last 7 days</GridItem>
                    </Grid>
                </CardBody>
                <CardFooter>View All 56 Vulnerabilities</CardFooter>
            </Card>
        );
    }
}

VulnerabilitiesCard.propTypes = {
    fetchVulnerabilities: PropTypes.func,
    vulnerabilities: PropTypes.object,
    vulnerabilitiesFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    vulnerabilities: state.DashboardStore.vulnerabilities,
    vulnerabilitiesFetchStatus: state.DashboardStore.vulnerabilitiesFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchVulnerabilities: (url) => dispatch(AppActions.fetchVulnerabilities(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(VulnerabilitiesCard));

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class Data extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    componentWillMount() {
        const req = new XMLHttpRequest;
        req.open("GET", "/api/nurses");
        req.send();
    }

    render() {
        return (
            <div>hello</div>
        );
    }
}

Data.propTypes = {
    
}

Data.defaultProps = {
    
}

export default Data;

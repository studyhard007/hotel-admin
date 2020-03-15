import React from 'react';

class Customer extends React.Component {
    state = {
        collapsed: false,
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render () {
        return (
            <div>这是顾客管理的页面！！</div>
        )
    }
}

export default Customer;
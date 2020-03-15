import React from 'react';


class Room extends React.Component {
    state = {
        collapsed: false
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return (
            <div>这是客房管理的页面！！！</div>
        );
    }
}

export default Room;
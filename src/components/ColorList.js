/**
 * ColorList.js Created by sandy on 11/10/2019
 */
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

class ColorList extends React.Component {
    render () {
        return (
            <TransitionGroup className="row">
                {this.props.items.map(item => (
                    <CSSTransition
                        key={item.name}
                        timeout={100}
                        classNames="fade">
                        <div className="col">
                            <div className="color-box ma-2" style={{ backgroundColor: item.color }}>{item.name}</div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        );
    }
}

ColorList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.number,
    }))
};

export default ColorList;

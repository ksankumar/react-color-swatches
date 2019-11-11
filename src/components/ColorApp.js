/**
 * ColorApp.js Created by sandy on 11/10/2019
 */
import React from "react";
import { initItems, newItem } from '../API'
import Loader from "./Loader";
import ColorList from "./ColorList";

class ColorApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            items: [],
            color: "",
            loading: true,
            validColor: false
        };

        this.handleColorChange = this.handleColorChange.bind(this);
        this.addSwatch = this.addSwatch.bind(this);
    }

    componentDidMount () {
        new Promise(resolve => {
            initItems(data => {
                this.setState({ items: data, nextName: data.length });
                resolve()
            })
        }).finally(() => {
            this.setState({ loading: false });
        })
    }

    handleColorChange (event) {
        const isValid = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i.test(event.target.value)
        this.setState({ color: event.target.value, validColor: isValid });
    }

    addSwatch (event) {
        event.preventDefault();
        const color = this.state.color.trim();
        if (color.length) {
            new Promise(resolve => {
                newItem(color, data => {
                    this.state.items.push(data)
                    resolve()
                })
            }).finally(() => {
                this.setState({ items: this.state.items, color: '', validColor: false });
            })
        }
    }

    render () {
        if (this.state.loading) return <Loader/>
        return (
            <div className="fade-in">
                <form onSubmit={this.addSwatch}>
                    <div className="row">
                        <input className="color-input pad col-7"
                               type="text"
                               name="color"
                               placeholder="#C0FFEE"
                               pattern="^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
                               onInvalid={(e) => e.target.setCustomValidity('Invalid color format. e.g. #FF0000')}
                               onInput={(e) => e.target.setCustomValidity('')}
                               onChange={this.handleColorChange}
                               value={this.state.color}
                               required/>
                        <button type="submit" className="add-btn pad col-3" disabled={!this.state.validColor}>Add
                            Swatch
                        </button>
                    </div>
                </form>
                <ColorList items={this.state.items}/>
            </div>
        );
    }
}

export default ColorApp;

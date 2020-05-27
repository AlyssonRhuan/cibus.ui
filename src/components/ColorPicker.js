import React from 'react';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.colorCode
      ? {
        displayColorPicker: false,
        color: {
          r: this.props.colorCode.split(',')[0],
          g: this.props.colorCode.split(',')[1],
          b: this.props.colorCode.split(',')[2],
          a: this.props.colorCode.split(',')[3],
        },
      }
      : {
        displayColorPicker: false,
        color: { r: '0', g: '0', b: '0', a: '1', },
      };

      const colorCode = this.state.color.r + ',' + this.state.color.g + ',' + this.state.color.b + ',' + this.state.color.a;
      this.props.onChange(colorCode);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    const colorCode = color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',' + color.rgb.a;
    this.props.onChange(colorCode);
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '29px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          height: 'calc(1.5em + .75rem + 2px)',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {
          this.state.displayColorPicker
            ? <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <ChromePicker color={this.state.color} onChange={this.handleChange} />
            </div>
            : null
        }
      </div>
    )
  }
}

export default ColorPicker
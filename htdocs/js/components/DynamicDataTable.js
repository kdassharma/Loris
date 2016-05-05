'use strict';

DynamicDataTable = React.createClass({
    displayName: 'DynamicDataTable',

    propTypes: {
        DataURL: React.PropTypes.string.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            'Headers': [],
            'Data': [],
            'isLoaded': false,
            'loadedData': 0
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            'DataURL': ''
        };
    },
    componentDidMount: function componentDidMount() {
        var that = this;
        $.ajax(this.props.DataURL, {
            dataType: 'json',
            xhr: function xhr() {
                var xhr = new window.XMLHttpRequest();
                xhr.addEventListener("progress", function (evt) {
                    console.log(evt);
                    that.setState({
                        'loadedData': evt.loaded
                    });
                });
                return xhr;
            },
            success: function success(data) {
                that.setState({
                    'Headers': data.Headers,
                    'Data': data.Data,
                    'isLoaded': true
                });
            },
            error: function error(data, error_code, error_msg) {
                console.error(error_code + ': ' + error_msg);
                that.setState({ "error": "Error loading data" });
            }
        });
    },
    render: function render() {
        if (!this.state.isLoaded) {

            if (this.state.error != undefined) {
                return React.createElement(
                    'div',
                    { className: 'alert alert-danger' },
                    React.createElement(
                        'strong',
                        null,
                        this.state.error
                    )
                );
            }

            return React.createElement(
                'button',
                { className: 'btn-info has-spinner' },
                'Loading',
                React.createElement('span', { className: 'glyphicon glyphicon-refresh glyphicon-refresh-animate' })
            );
        }

        return React.createElement(StaticDataTable, { Headers: this.state.Headers,
            Data: this.state.Data,
            getFormattedCell: this.props.getFormattedCell,
            freezeColumn: this.props.freezeColumn
        });
    }
});

RDynamicDataTable = React.createFactory(DynamicDataTable);
//# sourceMappingURL=DynamicDataTable.js.map

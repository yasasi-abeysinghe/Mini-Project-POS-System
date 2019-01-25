import React, {Component} from 'react';


// Edit item button component
class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editInputHidden: true
        };
    }

    enableEditInput = () => {
        this.setState({
            editInputHidden: !this.state.editInputHidden
        });
        this.props.onEditEnable();
        this.editItem(this.props.edititem)
    };


    editItem(item) {
        let url = 'http://localhost:8080/items/'+item.id;

        fetch(url, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "itemName": item.itemName,
                "quantity": this.props.newqty,
                "unitPrice": item.unitPrice,
                "orderNo": item.orderNo
            })
        })
            .then(function (response) {
                    if (response.ok) {
                        console.log('success!');
                    } else {
                        console.log(response);
                    }
                }
            );
    }


    render() {
        const buttonClass = this.state.editInputHidden ? 'btn btn-primary a-btn-slide-text' : 'btn btn-primary btn-save';
        const sign = this.state.editInputHidden ? 'glyphicon glyphicon-edit' : '';
        const buttonLabel = this.state.editInputHidden ? 'Edit' : 'Save';
        return (
            <button className={buttonClass} onClick={this.enableEditInput}>
                <span className={sign} aria-hidden="true"></span>
                <span><strong>{buttonLabel}</strong></span>
            </button>
        );
    }

}

export default EditItem;
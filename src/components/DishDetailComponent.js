import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        }
    }
    toggleModel = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit = (values) => {
        alert(`This is the current state ${JSON.stringify(values)}`)
        this.toggleModel();
    }
    render() {
        const required = (val) => val && val.length;
        const minLength = (len) => (val) => (!required(val) || !validName(val)) || (val && (val.length >= len));
        const maxLength = (len) => (val) => (!validName(val) ) || (!(val) || (val.length < len));
        const validName = (val) => !required(val) || (/^[A-Z\ ]+$/i.test(val));

        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModel}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" name="rating"> Rating</Label>
                                    <Control.select className="form-control" name="rating" model=".rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" name="author">Your Name</Label>
                                    <Control.text className="form-control" name="author" model=".author" placeholder="Your Name"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15),
                                        validName
                                    }} />
                                    <Errors className="text-danger" show="touched" model=".author"
                                    messages={{
                                        required: 'Required*',
                                        minLength: 'Name should be greater than 3 characters',
                                        maxLength: 'Name should be 15 characters or less',
                                        validName: 'Name is invalid'
                                    }} />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" name="comment">Comment</Label>
                                    <Control.textarea className="form-control" name="comment" model=".comment" rows="6"
                                    validators={{
                                        required, minLength: minLength(15)
                                    }} />
                                    <Errors className="text-danger" show="touched" model=".comment"
                                    messages={{
                                        required: 'Required*',
                                        minLength: 'Your comment should be at least 15 characters'
                                    }} />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModel}><span className="fas fa-pen"></span> Submit Comment</Button>
            </>
        );
    }
}

function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    const COMMENT = comments.map(comment => {
        return (
            <div key={comment.id}>
                <ul className="list-unstyled">
                    <li>{comment.comment}</li>
                    <br />
                    <li>--{comment.author},{/* Converting to the required format */} {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
            </div>
        );
    });
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {COMMENT}
            <CommentForm />
        </div>
    );
}

const DishDetailComponent = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h4>{props.dish.name}</h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }

}

export default DishDetailComponent;

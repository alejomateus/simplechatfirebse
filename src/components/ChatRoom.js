import React,{Component} from "react";

class ChatRoom extends Component{
    constructor(){
        super();
        this.state={
            message:"",
            messages:[
                // {
                //     id:0,
                //     text:"Test1"
                // },
                // {
                //     id:1,
                //     text:"Test2"
                // },
                // {
                //     id:2,
                //     text:"Test3"
                // }
            ]
        }
    }
    componentDidMount(){
        window.firebase.database().ref('messages/').on('value',snapshot=>{
            const currentMessages= snapshot.val();
            if (currentMessages != null){
                this.setState({
                    messages: currentMessages
                });
            }
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const list = this.state.messages;
        const newMessage ={
            id:this.state.messages.length,
            text :this.state.message
        }
        list.push(newMessage);
        window.firebase.database().ref(`messages/${newMessage.id}`)
        .set(newMessage);
        // this.setState({messages: list});
        this.setState({message:""})
    }
    updateMessage(e){
        this.setState({message:e.target.value});
    }
    render(){
        const { messages }=this.state;
        const messageList= messages.map(message=>{
            return <li key={message.id}>{message.text}</li>
        })
        return (
                <div>
                    <ul>
                        {messageList}
                    </ul>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" value={this.state.message} onChange={this.updateMessage.bind(this)}/>
                        <div></div>
                        <button>Send</button>
                    </form>
                </div>
            )
    }
}
export default ChatRoom;


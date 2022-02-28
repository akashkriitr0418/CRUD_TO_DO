const Todo = require("../models/crud");

const { Kafka } = require("kafkajs")

// the client ID lets kafka know who's producing the messages
const clientId = "myapp"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "newToDos"
// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ brokers })
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: clientId })




const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: async({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`)
      const task1=JSON.parse(message.value);
      const todo = new Todo({
        text:task1.text,DueDate:task1.DueDate,is_completed:task1.is_completed,assigned_to:task1.assigned_to,type:task1.type,user_id:task1.user_id
      });

      todo.save((err, task) => {
        if (err || !task) {
          return res.status(400).json({
            error: "something went wrong",
          });
        }else{
        console.log(task)}
      });
    
		}
	})
} 

var connection = async () => {
    await producer.connect();
    await consume();
    console.log("connected Kafka")
};
connection();





getTodo = (req, res) => {
  const userId = req.user._id;

  Todo.findOne({_id:req.body._id,user_id:userId},(err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    res.send(todo);
  });
};

getAllTodos = (req, res) => {
  const userId = req.user._id;

  Todo.find({user_id:userId},(err,doc)=>{
     if(err){
     return res.status(400).json({
       error: "404 todo not found",
     });
  }
   res.send(doc);
   })
  };


 createTodo = async(req, res) => {
    req.body.user_id = req.user._id;
    const todo = new Todo(req.body);

    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(todo)
        },
      ],
    })

    res.send("ok");

  };


 updateTodo = (req, res) => {
    const userId = req.user._id;
    const todo_id =  req.body["_id"];
    delete req.body["_id"];
    Todo.updateMany({user_id:userId,_id:todo_id},{$set:req.body},(err, t) => {
      if (err || !t){
        return res.status(400).json({
          error: "something went wrong while updating",
        });
      }
      res.json(t);
    });
  };

  
 deleteTodo = (req, res) => {
    const todoId = req.body._id;
    const userId = req.user._id;

    Todo.deleteMany({_id:todoId,user_id:userId},(err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong while deleting the todo",
        });
      }
      res.json({
        task_deleted: task,
        message: "Todo deleted successfully!",
      });
    });
  };



//ByType
getTodoByType = (req, res) => {
   const type_name =  req.body.type;
   const userId = req.user._id;
    Todo.find({type:type_name,user_id:userId},(err,doc)=>{
      if(err){
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    res.send(doc);
    })
};

//Mark Done
  markCompleteByType = (req, res) => {
    type_name =  req.body.type;
    const userId = req.user._id;
    Todo.updateMany({type:type_name,user_id:userId},{$set:{is_completed:1}},(err, t) => {
      console.log("doing");
      if (err || !t) {
        return res.status(400).json({
          error: "something went wrong while updating",
        });
      }
      res.json(t);
    });
  };

// delete type

  deleteTodoBytype = (req, res) => {
    type =  req.body.type;
    const userId = req.user._id;
    Todo.deleteMany({type:type,user_id:userId},(err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong while deleting the todo",
        });
      }
      res.json({
        task_deleted: task,
        message: "Todo deleted successfully!",
      });
    });
  };
  
  module.exports = {  createTodo, getTodo, deleteTodo, getAllTodos, updateTodo,
                      getTodoByType,markCompleteByType,deleteTodoBytype};
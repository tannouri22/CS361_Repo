# CS361_Repo

# Communication Contract
This section will discuss how to incorporate my image transfixing service into my partner's project, such as example calls and necessary steps to secure a connection between services.

**_Preliminary Steps_**
We will be using PyZMQ for messaging between services. This means that a TCP connection must first be established before any calls can be made to the microservice. Use the following code to do so: &nbsp;

 #the json packages will be necessary for the transport of the data type used in the microservice &nbsp;

    import zmq               

    import json            

    from json import JSONEncoder

    context = zmq.Context() 

    socket = context.socket(zmq.REQ)

    socket.connect('tcp://localhost:2984')


class NumpyArrayEncoder(JSONEncoder):  

    def default(self, obj):

        if isinstance(obj, np.ndarray):

            return obj.tolist()

        return JSONEncoder.default(self, obj)

Due to the microservice accepting images through its socket, we will need to take vital steps in ensuring that we
are able to convert the image to an array (numpyarray). Only then can this array be converted to JSON, which is 
small enough to send through the connection. We include a `NumpyArrayEncoder` that is able to convert a numpy array to 
a standard array, as an intermediary step. All verification messages must be bytes and are written with a `b` in front to 
convert them to this format.

**How to REQUEST data** &nbsp; 

    `#the numpy arrays must be converted to an array and wrapped in json

    #otherwise the zmq will error

    #furthermore, you must anticipate a message from the microservice that the array has been received


    socket.send_string(json.dumps(numpyarray, cls=NumpyArrayEncoder))     
    verification_message = socket.recv()`

**How to RECEIVE data** &nbsp;

    #similar to above, you will receive a JSON object, and will need to decode it back to a numpy array

    #it is crucial to send a verification message that the array has been received


    finalimage_json = json.loads(socket.recv())

    secondimage = asarray(finalimage_json)

    socket.send(b"thank you for the final image!")

**UML Sequence Diagram**
![UML_Microservice](https://user-images.githubusercontent.com/86091373/198748487-0d1e2590-de84-4e37-a647-c28726331d7f.png)

# Craftics Database

This web application is a pattern database designed for all types of crafters. It will allow an individual to save patterns of their liking to a personal library and query both the database and their saved patterns based on tags or search terms. The application uses Handlebars templating engine and SQL to store user information and patterns. 

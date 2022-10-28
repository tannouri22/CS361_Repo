# CS361_Repo

# Communication Contract
This section will discuss how to incorporate my image transfixing service into my partner's project, such as example calls and necessary steps to secure a connection between services.

**_Preliminary Steps_**
We will be using PyZMQ for messaging between services. This means that a TCP connection must first be established before any calls can be made to the microservice. Use the following code to do so: &nbsp;

 #the json packages will be necessary for the transport of the data type used in the microservice &nbsp;
`import zmq                   &nbsp;   
import json &nbsp;
from json import JSONEncoder` &nbsp;

`context = zmq.Context()    &nbsp;                 
socket = context.socket(zmq.REQ) &nbsp;
socket.connect('tcp://localhost:2984')` &nbsp;

`class NumpyArrayEncoder(JSONEncoder): &nbsp;
    def default(self, obj): &nbsp;
        if isinstance(obj, np.ndarray): &nbsp;
            return obj.tolist() &nbsp;
        return JSONEncoder.default(self, obj)` &nbsp;

Due to the microservice accepting images through its socket, we will need to take vital steps in ensuring that we
are able to convert the image to an array (numpyarray). Only then can this array be converted to JSON, which is 
small enough to send through the connection. We include a `NumpyArrayEncoder` that is able to convert a numpy array to 
a standard array, as an intermediary step. 

**How to REQUEST data**
`#the numpy arrays must be converted to an array and wrapped in json &nbsp;
#otherwise the zmq will error &nbsp;
#furthermore, you must anticipate a message from the microservice that the array has been received` &nbsp;

`socket.send_string(json.dumps(numpyarray, cls=NumpyArrayEncoder)) &nbsp;        
verification_message = socket.recv()` &nbsp;

**How to RECEIVE data**
`#similar to above, you will receive a JSON object, and will need to decode it back to a numpy array &nbsp;
#it is crucial to send a verification message that the array has been received` &nbsp;

`finalimage_json = json.loads(socket.recv()) &nbsp;
secondimage = asarray(finalimage_json) &nbsp;
socket.send(b"thank you for the final image!")` &nbsp;

**UML Sequence Diagram**


# Craftics Database

This web application is a pattern database designed for all types of crafters. It will allow an individual to save patterns of their liking to a personal library and query both the database and their saved patterns based on tags or search terms. The application uses Handlebars templating engine and SQL to store user information and patterns. 
# Nodejs Rest API with N Layers architecture and Unit and E2E tests
<br>
N-Layers
<br>
database<br>
    - a file which store all app data<br>

src -all source code<br>
    - entities - object mappings<br>
    - factories - instance generators<br>
    - repositories - data acess<br>
    - routes - endpoint mappings<br>
    - services - communication between routes and repositories layer (business logic)<br>
    - util - share code<br>
    - handler - communication between routes and server<br>
    - index - server instance<br>
    
tests -> all automated test suites<br>
    - integration tests 
    - testing on the user point of view. it's also an E2E test because there's no app consuming it<br>

    - unit tests 
    - all tests that muust run without any external connections such as databases, external APIs and the fileSystem<br>



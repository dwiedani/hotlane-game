# Hotlane

Daniel Schlegel
WS 2021/2022
MIB 7

Course: PRIMA
Docent: Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

[live](https://dwiedani.github.io/hotlane-game/) \
[source code](https://github.com/dwiedani/hotlane-game) \
[design](https://github.com/dwiedani/hotlane-game/design) \

## Description
Drive on the highway while the sounds of synthwave accompany you. The road seems to be infinite, but don't become inattentive, you will encounter obstacles. How far can you go? Show your skills and place your milage on the public scoreboard!

### Controls
**Movement:** A,D / Arrow-keys

## Checklist for the final assignment
| Nr | Criterion       | Explanation                                                                                                              |
|---:|-------------------|---------------------------------------------------------------------------------------------------------------------|
|  0 | Units and Positions | The world coordinates origin (the 0) is located on the upper left courner of the visible road. this provides allways positive car positioning aswell as drivable area within a positive range. Like this also the roads benefit from a positive moving direction. The road pivot is also placed on the upper left corner so no random negative numbers have to be considered for the obstacle placement.|
|  1 | Hierarchy         | Most interesting is the road setup. The road itself (rigid) is not moving and containes two moving (non rigid) road subnodes where the obstacles are placed so the obstacles will allways move with the road subnodes speed it was placed on.|
|  2 | Editor            | The Editor was used for the base scene setup which containes the road with all its parts and the horrizon which includes multiple tile nodes. This makes scence because this depends highly on the visual apearance and has to be adjusted from the get go. The obstacle creation is handled by code because it is generated randomly. Aswell as the Agent creation so a respawn mechanism or a multiplayer functionality can be considered in the future.|
|  3 | Scriptcomponents  | First of all the roads (moving parts) have a scriptcomponent so the initial and maxspeed can also be adjusted in the editor. When adjusting other parameters of the road like the size of the mesh for example, the speeds can be updated easily without changing something in the sourcecode. Also Agent and Camera have ComponentScripts.|
|  4 | Extend            | GameState and ScoreBoard inherit from f.Mustable so they can be used for the UI. Also Obstacles and the Agent inherit from f.Node to provide the functionality of adding components and graph placement, which provides the outsourcing from the main code in a more object oriented manner. The sfx also inherit from f.Node to give better implementation and usage while handling collisions.|
|  5 | Sound             | The themesong was added to give the player a more immersive experience synergizing with the art style. Furthermore the crash sounds give the player a gameplay related feedback.|
|  6 | VUI               | The UI consists of the current score the player has already reached at any time. Secondly the scoreboard is available at any time. While playing it provides the next higher score from the published highscores in perspective to the currently reached score by the player. When the player crashes into a obstacle, the scoreboard is extended to its full size and provides the player the ability to save his score to the public scoreboard. Also a replay button is provided.|
|  7 | Event-System      | The evensystem is used to send a GameOver event trough the graph to inform mulitple instances about the end of a playingsession. Was very helpful since it saves multiple references between diffrent instances (objects). |
|  8 | External Data     | Since the concept does not allow a lot of gameplay related changable parameters (to provide equal chances in respect to the scoreboard). Some base application settings could be considered to be provided via external data. By modifing a settings.json the themesong volume could be changed for example. Nevertheless the scoreboard is based on external data which are fetched and posted from/to a specially developed rest service hosted on heroku. |
|  9 | Light             | A ambient light was placed on the road root node to provide a base luminance and a directional light facing towards the horrizon to produce shadows on the models and illuminate the obstacles for good vision. |
|  A | Physics           | Rigidbody components: Obstacles, Guardrails, Road and Agent. Forces on Agent. Collision Eventhandling on Agent with Obstacles.|
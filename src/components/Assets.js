const createImage = (src) => {
  const img = new Image()
  img.src = src
  return img
}

const AngularImgSrc = createImage("../assets/angular.png")
const AnsibleImgSrc = createImage("../assets/ansible.png")
const AzureImgSrc = createImage("../assets/azure.png")
const CppImgSrc = createImage("../assets/cpp.png")
const CsImgSrc = createImage("../assets/cs.png")
const DockerImgSrc = createImage("../assets/docker.png")
const FirebaseImgSrc = createImage("../assets/firebase.png")
const FlutterImgSrc = createImage("../assets/flutter.png")
const JavaImgSrc = createImage("../assets/java.png")
const JsImgSrc = createImage("../assets/js.png")
const KotlinImgSrc = createImage("../assets/kotlin.png")
const KubernetesImgSrc = createImage("../assets/kubernetes.png")
const LaravelImgSrc = createImage("../assets/laravel.png")
const NodeImgSrc = createImage("../assets/node.png")
const PhpImgSrc = createImage("../assets/php.png")
const PythonImgSrc = createImage("../assets/python.png")
const ReactImgSrc = createImage("../assets/react.png")
const SwiftImgSrc = createImage("../assets/swift.png")
const SymfonyImgSrc = createImage("../assets/symfony.png")
const TsImgSrc = createImage("../assets/ts.png")
const UnityImgSrc = createImage("../assets/unity.png")
const VueImgSrc = createImage("../assets/vue.png")
const CocaImgSrc = createImage("../assets/coca.png")
const LegoImgSrc = createImage("../assets/lego.png")

const BAAL = createImage("../assets/baal.jpg")
const DAMO = createImage("../assets/damo.jpg")
const SCDA = createImage("../assets/scda.jpg")
const ABZA = createImage("../assets/abza.jpg")
const LATH = createImage("../assets/lath.jpg")
const FOUL = createImage("../assets/foul.jpg")
const ZAZE = createImage("../assets/zaze.jpg")
const ZIYU = createImage("../assets/ziyu.jpg")
const THCO = createImage("../assets/thco.jpg")

const PlayerImg = createImage("../assets/player.png")



const dialogImgSrc = createImage("../assets/dialogBox.png")
const skillImgSrc = createImage("../assets/skillboard2.png")
const CarteImg = createImage("../assets/map.png")

export const Skoolers = [
  {
    name: "Alexandre ( BAAL )",
    position: { x: 1290, y: 1054, w: 58, h: 46 },
    skill: [
      JavaImgSrc,
      PhpImgSrc,
      JsImgSrc,
      LaravelImgSrc,
      AngularImgSrc,
    ],
    text: "Bidouilleur de la premiere heure",
    img: BAAL,
  },
  {
    name: "Clarisse ( DAMO )",
    position: { x: 1050, y: 1017, w: 65, h: 37 },
    text: "You're talking to me ?",
    skill: [ReactImgSrc, TsImgSrc, JsImgSrc, JavaImgSrc],
    img: DAMO,
  },
  {
    name: "Damien (SCDA)",
    position: { x: 1673, y: 777, w: 59, h: 42 },
    text: "Ninja du pixel perfect",
    skill: [ReactImgSrc, JsImgSrc, LaravelImgSrc, PhpImgSrc],
    img: SCDA,
  },
  {
    name: "Elisabeth ( ABZA )",
    position: { x: 1091, y: 684, w: 71, h: 33 },
    text: "J'ai tres souvent la tete dans les nuages.",
    skill: [JavaImgSrc, ReactImgSrc, TsImgSrc, FirebaseImgSrc, AzureImgSrc],
    img: ABZA,
  },
  {
    name: "Gary",
    position: { x: 1383, y: 1712, w: 70, h: 39 },
    text: "oops! 404 page not found",
    skill: [JsImgSrc, PhpImgSrc],
  },
  {
    name: "Jean-Christophe",
    position: { x: 769, y: 1665, w: 50, h: 58 },
    text: "Bonjour, je cherche la salle Kubrick svp ?",
    skill: [NodeImgSrc, VueImgSrc],
  },
  {
    name: "Thibaud ( LATH )",
    position: { x: 858, y: 1301, w: 60, h: 44 },
    text:
      "Pssst, toi la, pas si fort ! On va nous cramer. T'aurais pas une p'tit mission ?!",
    skill: [UnityImgSrc, CsImgSrc, ReactImgSrc, PythonImgSrc],
    img: LATH,
  },
  {
    name: "Ulysse ( FOUL )",
    position: { x: 1107, y: 1390, w: 43, h: 47 },
    text: "Tu passes une bonne visite ?",
    skill: [
      DockerImgSrc,
      KubernetesImgSrc,
      AnsibleImgSrc,
      PythonImgSrc,
      NodeImgSrc,
    ],
    img: FOUL,
  },
  {
    name: "Zaki ( ZAZE )",
    position: { x: 1291, y: 1353, w: 60, h: 40 },
    text:
      "J'aimerais bien que tu restes un peu ici. On va manger... des chips ! T'entends ? Des chips!",
    skill: [NodeImgSrc, VueImgSrc, PythonImgSrc, CppImgSrc],
    img: ZAZE,
  },
  {
    name: "Ziyu ( ZIYU )",
    position: { x: 1380, y: 823, w: 64, h: 39 },
    text: "Un p'tit peu de covid ?",
    skill: [KotlinImgSrc, SwiftImgSrc, JavaImgSrc, FlutterImgSrc],
    img: ZIYU,
  },
  {
    name: "Sisavang",
    position: { x: 1580, y: 1404, w: 60, h: 39 },
    text: "Allo ?",
    skill: [JavaImgSrc, TsImgSrc, NodeImgSrc, AngularImgSrc],
  },
  {
    name: "Thibaut ( THCO )",
    position: { x: 989, y: 777, w: 75, h: 46 },
    text: "C'est moi le Mentor !",
    skill: [JavaImgSrc, PhpImgSrc, NodeImgSrc, CocaImgSrc, LegoImgSrc],
    img: THCO,
  },
]

export const EasterEgg = [
  {
    position: { x: 1301, y: 1606, w: 42, h: 42 },
    text: "Culture Code by Octo Technology",
  },
  {
    position: { x: 1617, y: 1035, w: 81, h: 41 },
    text: "Passeport d'integration...",
  },
  {
    position: { x: 1112, y: 1470, w: 34, h: 45 },
    text: "Je me prendrai bien un verre d'eau !",
  },
  {
    position: { x: 822, y: 1610, w: 89, h: 38 },
    text: "Quelqu'un monte ...! ",
  },
  {
    position: { x: 1512, y: 1470, w: 51, h: 45 },
    text: "On dirait la peluche PHP !",
  },
  {
    position: { x: 1207, y: 647, w: 61, h: 72 },
    text: "Culture DevOps I by Octo Technology",
  },
  {
    position: { x: 1521, y: 719, w: 84, h: 73 },
    text: "Un scrum board ! Il est bien fourni !",
  },
]

export {
  AngularImgSrc,
  AnsibleImgSrc,
  AzureImgSrc,
  CppImgSrc,
  CsImgSrc,
  DockerImgSrc,
  FirebaseImgSrc,
  FlutterImgSrc,
  JavaImgSrc,
  JsImgSrc,
  KotlinImgSrc,
  KubernetesImgSrc,
  LaravelImgSrc,
  NodeImgSrc,
  PhpImgSrc,
  PythonImgSrc,
  ReactImgSrc,
  SwiftImgSrc,
  SymfonyImgSrc,
  TsImgSrc,
  UnityImgSrc,
  VueImgSrc,
  dialogImgSrc,
  skillImgSrc,
  CarteImg,
  PlayerImg
}

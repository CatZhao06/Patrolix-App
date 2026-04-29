import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';
import 'vant/lib/index.css';
import { 
  Button, 
  Icon, 
  Tabbar, 
  TabbarItem, 
  NavBar, 
  Cell, 
  CellGroup, 
  Switch, 
  Image as VanImage,
  Tag,
  Tabs,
  Tab,
  FloatingPanel
} from 'vant';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Vant components
app.use(Button);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Cell);
app.use(CellGroup);
app.use(Switch);
app.use(VanImage);
app.use(Tag);
app.use(Tabs);
app.use(Tab);
app.use(FloatingPanel);

app.mount('#root');

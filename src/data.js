import Steinbeck from "./img/Steinbeck.jpg";
import Dostoevsky from "./img/Dostoevsky.jpg";
import Huxley from "./img/Huxley.jpg";
import Wiliam from "./img/cover.jpg";
const books = [
   {
      id: 1,
      author: "Fyodor Dostoevsky",
      title: "Crime and Punishment",
      cover: Dostoevsky,
      pages: 486,
      desc:
         "Crime and Punishment focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her money. Before the killing, Raskolnikov believes that with the money he could liberate himself from poverty and go on to perform great deeds. However, once it is done he finds himself racked with confusion, paranoia, and disgust for what he has done. His moral justifications disintegrate completely as he struggles with guilt and horror and confronts the real-world consequences of his deed.",
      print: "NeverlandPublishing",
      price: 13.99,
      date: 2017,
      isActive: false,
      count: 0,
      total: 0
   },
   {
      id: 2,
      author: "John Steinbeck",
      title: "East of Eden",
      cover: Steinbeck,
      pages: 581,
      desc:
         "A masterpiece of Biblical scope, and the magnum opus of one of America's most enduring authors. In his journal, Nobel Prize winner John Steinbeck called East of Eden \"the first book,\" and indeed it has the primordial power and simplicity of myth. Set in the rich farmland of California's Salinas Valley, this sprawling and often brutal novel follows the intertwined destinies of two families-the Trasks and the Hamiltons-whose generations helplessly reenact the fall of Adam and Eve and the poisonous rivalry of Cain and Abel.",
      print: "SeldomBookHouse",
      price: 15.99,
      date: 2019,
      isActive: false,
      count: 0,
      total: 0
   },
   {
      id: 3,
      author: "Aldous Huxley",
      title: "Brave New World",
      cover: Huxley,
      pages: 295,
      desc:
         "Brave New World is a dystopian novel by English author Aldous Huxley, written in 1931 and published in 1932. Largely set in a futuristic World State of genetically modified citizens and an intelligence-based social hierarchy, the novel anticipates huge scientific developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning, that are combined to make a utopian society that goes challenged only by a single outsider. Huxley followed this book with a reassessment in essay form, Brave New World Revisited (1958), and with his final novel, Island (1962), the utopian counterpart. The novel is often compared to George Orwell's 1949 Nineteen Eighty-Four.",
      print: "Antiutopian",
      price: 11,
      date: 2018,
      isActive: false,
      count: 0,
      total: 0
   },
   {
      id: 4,
      author: "William Shakespeare",
      title: "Macbeth",
      cover: Wiliam,
      pages: 1289,
      desc:
         "A brave Scottish general named Macbeth receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders King Duncan and takes the Scottish throne for himself. He is then wracked with guilt and paranoia. Forced to commit more and more murders to protect himself from enmity and suspicion, he soon becomes a tyrannical ruler. The bloodbath and consequent civil war swiftly take Macbeth and Lady Macbeth into the realms of madness and death.",
      print: "SeldomBookHouse",
      price: 7,
      date: 2016,
      isActive: false,
      count: 0,
      total: 0
   }
];
export { books };

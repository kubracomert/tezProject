
export async function denen() {
  var formBody = [];
  formBody.push( await fetch('http://172.16.0.218/react-native-insert/tumfirmalar.php'));

  return formBody;

}







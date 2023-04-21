// import jwt from 'jsonwebtoken';

// export default (req,res, next) => {
//     const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); //спарсим токен и вдальнейшем расшифровать

//     if (token) { //если токен есть
//         try { 
//             const decoded = jwt.verify(token, 'secret123'); // расшифруем токен с помощью функции verify, в нее мы передаем токен и сам ключ по которому будем расшифровывать этот токен

//             req.userId = decoded._id; // если мы смогли расшифровать токен, мы передаем то, что мы смогли расшифровать(в токине храниться инфа о его id о дате создания и удаления)
//             next(); // если я расшифровал токен, сохранил его в "req.userId" выполни следующую функциюю next()
//         } catch (e) {
//             return res.status(403).json({
//                 message: 'Нет доступа',
//             });
//         }
//     } else{ // если токена нет верни мне сообщение со статусом, что нет доступа
//         return res.status(403).json({ // Нельзя выполнять код, если сделал один ответ
//             message: 'Нет доступа',
//         });
//     }

//     res.send(token);
// }
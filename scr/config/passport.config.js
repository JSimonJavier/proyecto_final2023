import passport from "passport";
import local from "passport-local";
import { UserModel } from "../DAO/models/users.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import GitHubStrategy from "passport-github2";
import { cartModel } from "../DAO/models/carts.model.js";
import transport from "../utils/nodemailer.js";
const LocalStrategy = local.Strategy;

export function iniPassport(){
    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
          try {
            const user = await UserModel.findOne({ email: username });
            if (!user) {
              console.log('User Not Found with username (email) ' + username);
              return done(null, false);
            }
            if (!isValidPassword(password, user.password)) {
              console.log('Invalid Password');
              return done(null, false);
            }
    
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        })
      );
    
      passport.use(
        'register',
        new LocalStrategy(
          {
            passReqToCallback: true,
            usernameField: 'email',
          },
          async (req, username, password, done) => {
            try {
              const { email, firstName, lastName, role } = req.body;
              let user = await UserModel.findOne({ email: username });
              if (user) {
                console.log('User already exists');
                return done(null, false);
              }
              const cartId = await cartModel.create({})
              const newUser = {
                email,
                firstName,
                lastName,
                role,
                password: createHash(password),
                cartId,
              };
              let userCreated = await UserModel.create(newUser);
              console.log(userCreated);
              console.log('User Registration succesful');

              await transport.sendMail({
                from: "Ecommerce <javisimon22@gmail.com>",
                to: newUser.email,
                subject: "registration succesfull",
                html: `
                
                <div> 
                <H1>
                WELCOME TO LOTRshop
                </H1>
                </div>
                `,})

              return done(null, userCreated);
            } catch (e) {
              console.log('Error in register');
              console.log(e);
              return done(e);
            }
          }
        )
      );
    
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.bfd19ef657c200b3',
        clientSecret: 'c6e9b9ee8eb09a53947a351bce97aa68fe86de82',
        callbackURL: 'http://localhost:8080/api/session/githubcallback',
      },
      async (accesToken, _, profile, done) => {
        try {
          const res = await fetch('https://api.github.com/user/emails', {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: 'Bearer ' + accesToken,
              'X-Github-Api-Version': '2022-11-28',
            },
          });
          const emails = await res.json();
          const emailDetail = emails.find((email) => email.verified == true);

          if (!emailDetail) {
            return done(new Error('cannot get a valid email for this user'));
          }
          profile.email = emailDetail.email;

          let user = await UserModel.findOne({ email: profile.email });
          if (!user) {
            const cartId = await cartModel.create({})
            const newUser = {
              email: profile.email,
              firstName: profile._json.name || profile._json.login || 'noname',
              lastName: 'nolast',
              role: "user",
              password: 'nopass',
              cartId
            };
            let userCreated = await UserModel.create(newUser);
            console.log('User Registration succesful');
            return done(null, userCreated);
          } else {
            console.log('User already exists');
            return done(null, user);
          }
        } catch (e) {
          console.log('Error en auth github');
          console.log(e);
          return done(e);
        }
      }
    )
  );

      passport.serializeUser((user, done) => {
        done(null, user._id);
      });
    
      passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
      });
}

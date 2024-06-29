import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { UserLdap } from '../user-ldap';
import { LDAP_USERS } from 'src/model/ldap-mock-data';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserLdap[] = LDAP_USERS;
  private usersUrl = 'api/users';
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    return this.http.post<UserLdap>(this.usersUrl, user,{headers: this.httpOptions});
  }
  updateUser(user: UserLdap): Observable<UserLdap> {
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user,{headers: this.httpOptions});
  }
/*
  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    console.log('Attempting to update user:', userToUpdate);
    console.log('Current users:', this.users);
    const user =this.users.find(u => u.login ===userToUpdate.login);
    if(user){
      user.nom = userToUpdate.nom;
      user.prenom =userToUpdate.prenom;
      user.nomComplet=userToUpdate.nomComplet;
      user.motDePasse=userToUpdate.motDePasse;


      return of(userToUpdate);
    }
    return throwError(()=> new Error('Utilisateur non trouvé'));
  }
*/
  getUser(id: number): Observable<UserLdap> {

    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }

/*
getUser(login: string): Observable<UserLdap> {
  console.log("login recherché :", login);
  const user: UserLdap | undefined = this.users.find(user => user.login === login);
  if (user !== undefined) {
    return of(user);
  } else {
    return throwError(new Error("Utilisateur non trouvé"));
  }
}
*/

  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {headers: this.httpOptions});
  }
}

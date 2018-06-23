import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { GeneralProvider } from "../general/general";


const DB_NAME: string = 'myBusTrip.db';

@Injectable()
export class DbService {
	public obj: any;
	public db = null;

	constructor(
		private platform: Platform,		
		public SQLite: SQLite,
		public general:GeneralProvider
	) {
		platform.ready().then(() => {
			console.log("PLATFORM READY IN PROVIDER")

			if (this.platform.is('cordova')) {
				// this.db = new SQLite();
				this.SQLite.create({
					name: DB_NAME,
					location: "default"
				}).then((db: SQLiteObject) => {
					this.obj = db;
					console.error("open database", db);
					this.createBuslist()
				}, (error) => {
					console.error("Unable to open database", error);
				})
			}
		});
	}

	loadBusForOffline(){
		console.log('load');
		
		this.general.getAuth().subscribe(res=>{
			if(res != ""){
				this.general.getheader(res)
				this.general.getcity().subscribe(res=>{
					if(res['success'] != true){
						let dataArr = res['data'];
						/** START - Store in local db */
						this.deleteBuslist();
						dataArr.forEach(data => {
						this.insertbus(data);
						});
					}
				})
			}
		})
	}
	public createBuslist() {
		console.log("create case");
		this.obj.executeSql("CREATE TABLE IF NOT EXISTS tbl_buslist (id INTEGER PRIMARY KEY AUTOINCREMENT, CityId INTEGER, City TEXT, State TEXT)", {})
			.then((data) => {
				console.log("TABLE CREATED: ", JSON.stringify(data));
			}, (error) => {
				console.error("Unable to execute sql", JSON.stringify(error));
			});
	}

	public insertbus(objCase: any) {
		console.log(objCase);
		return new Promise((resolve, reject) => {
			this.obj.executeSql("INSERT INTO tbl_buslist (CityId, City, State) VALUES (?, ?, ?)",
				[objCase.CityId, objCase.City, objCase.State])
				.then((data) => {
					resolve(data);
					console.log("INSERTED: insertCase" + JSON.stringify(data));
				}, (error) => {
					reject(error);
					console.log("ERROR: insertCase" + JSON.stringify(error));
				});
		});
	}

	public deleteBuslist() {
	
		// if (this.platform.is('cordova')) {
		return new Promise((resolve, reject) => {
			this.obj.executeSql("DELETE FROM tbl_buslist", {})
				.then((data) => {
					resolve(data);
					console.log(data);
				}, (error) => {
					reject(error);
					console.log("ERROR: deleteAllSector" + JSON.stringify(error));
				});
		});
		// }
	}

	public getbus(name) {
		
		return new Promise((resolve, reject) => {
			this.obj.executeSql("SELECT * FROM tbl_buslist WHERE City LIKE ? ", [name+'%'])
				.then((data) => {
					console.log(data)
					}, (error) => {
					reject(error);
					console.log("ERROR: getComapaignProtein" + JSON.stringify(error));
				});
		});
	}

}
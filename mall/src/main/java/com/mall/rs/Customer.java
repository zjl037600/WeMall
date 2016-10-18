package com.mall.rs;

import java.util.UUID;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Path("customer")
@Component
public class Customer {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	@GET
	@Path("updatepassword/{password}/{id}")
	public String updatePassword(@PathParam("password")String Password, @PathParam("id")String ID) {
		//
		String sql = "update vip_file set vip_Password = '" + Password + "' where vip_ID = '" + ID + "'";
		try {
			execSQL(sql);
		} catch (Exception e) {
			return "Fail";
		}
		return "Success";
	}
	
	/**
	 * 在hibernate中执行SQL insert or update or delete，见saveTestTwo(), savetestthree(), saveTestFour()
	 * @param 传入sql语句
	 */
	private void execSQL(final String sql) {
		hibernateTemplate.execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException {
				session.createSQLQuery(sql).executeUpdate();
				return null;
			}
		});
	}
}

package com.mall.rs;

import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Path("mall")
@Component
public class malltest {

	private HibernateTemplate hibernateTemplate;

	@GET
	@Path("testone")
	public String test() {
		return "success";
	}

	@GET
	@Path("/testtwo/{ParamOne}/{ParamTwo}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject query(@PathParam("ParamOne") String OneParam, @PathParam("ParamTwo") String TwoParam) {
		JSONObject jsonTest = new JSONObject();
		try {
			jsonTest.put("ParamOne", OneParam);
			jsonTest.put("ParamTwo", TwoParam);
		} catch (Exception e) {
		}
		return jsonTest;
	}
	
	public List sqlQuery(@PathParam("sql") String query) {
		final String sql = query;
		List list = (List) hibernateTemplate.execute(new HibernateCallback() {
			public Object doInHibernate(Session session)
					throws HibernateException {
				return session.createSQLQuery(sql).list();
			}
		});
		return list;
	}

	public List<Map<String, Object>> query(String query) {
		List<Map<String, Object>> list = this.hibernateTemplate.find(query);
		return list;
	}

	class HibernateCall implements HibernateCallback {
		String hql;
		int page;
		int rows;

		public HibernateCall(String hql, int page, int rows) {
			this.hql = hql;
			this.page = page;
			this.rows = rows;
		}

		public Object doInHibernate(Session session) {
			Query query = session.createQuery(hql);
			List list = query.setFirstResult(page * rows).setMaxResults(rows).list();
			return list;
		}
	}
}

package com.mall.rs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

@Path("mall")
@Component
public class malltest {

	@Autowired
	private HibernateTemplate hibernateTemplate;

	/**
	 * hibernate�������ݣ������ݸ�ʽΪMap<String, Object>���浽��Ӧ��ʵ���У����ݱ����ڶ�Ӧ�����ݿ����
	 */
	@GET
	@Path("savetestone")
	public String saveTestOne() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("vip_ID", "TestID1");
		map.put("vip_Name", "TestName1");
		map.put("vip_Password", "TestPassword1");
		map.put("vip_Telephone", "TestTelephone1");
		map.put("vip_Address", "TestAddress1");
		map.put("vip_Recommended_ID", "TestRecommendedID1");
		try {
			this.hibernateTemplate.saveOrUpdate("vip_file", map);
		} catch (Exception e) {
			return "Save Test One Fail";
		}
		return "Save Test One Success";
	}

	@GET
	@Path("savetesttwo")
	public String saveTestTwo() {
		String uuid1 = UUID.randomUUID().toString();
		String sql = "insert into vip_file(id, vip_ID, vip_Name, vip_Password, vip_Telephone, vip_Address, vip_Recommended_ID) VALUES('"
				+ uuid1 + "', 'TestID2', " + "'TestName2', " + "'TestPassword2', " + "'TestTelephone2', "
				+ "'TestAddress2', " + "'TestRecommendedID2')";
		try {
			execSQL(sql);
		} catch (Exception e) {
			return "Save Test Two Fail";
		}
		return "Save Test Two Success";
	}

	@GET
	@Path("savetestthree")
	public String saveTestThree() {
		String sql = "update vip_file set vip_Name = 'TestName3', vip_Password = 'TestPassword3' where vip_ID = 'TestID2'";
		try {
			execSQL(sql);
		} catch (Exception e) {
			return "Save Test Three Fail";
		}
		return "Save Test Three Success";
	}

	@GET
	@Path("savetestfour")
	public String saveTestFour() {
		/*
		String sql = "delete from vip_file where vip_Name = 'TestName3'";
		try {
			execSQL(sql);
		} catch (Exception e) {
			return "Save Test Four Fail";
		}
		return "Save Test Four Success";
		*/
		return "test";
	}

	@GET
	@Path("savetestfive")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray saveTestFive() {
		JSONArray jsonArray = new JSONArray();
		String sql = "select * from vip_file where vip_ID = 'TestID1'";
		try {
			jsonArray = sqlQuery(sql);
		} catch (Exception e) {
			return null;
		}
		return jsonArray;
	}
	
	@GET
	@Path("savetestsix")
	public String saveTestSix() {
		List<Object> list = new ArrayList<Object>();
		String hql = "from vip_file";
		try {
			list = hqlQuery(hql);
		} catch (Exception e) {
			return "Save Test Six Fail";
		}
		return "Save Test Six Success";
	}
	
	@GET
	@Path("savetestseven/{page}/{rows}")
	public String saveTestSeven(@PathParam("page")int page, @PathParam("rows")int rows) {
		String hql = "from vip_file";
		try {
			List<Object> list = this.hibernateTemplate.executeFind(new HibernateCall(hql,
					page, rows));
			for(Object obj : list)
			{
				Map<String, Object> map = (Map<String, Object>) obj;
			}
		} catch (Exception e) {
			return "Save Test Seven Fail";
		}
		return "Save Test Seven Success";
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

	/**
	 * ��hibernate��ִ��SQL insert or update or delete����saveTestTwo(), savetestthree(), saveTestFour()
	 * @param ����sql���
	 */
	private void execSQL(final String sql) {
		hibernateTemplate.execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException {
				session.createSQLQuery(sql).executeUpdate();
				return null;
			}
		});
	}
	
	/**
	 * sql��ѯ�����ؽ����JSONArray����savetestfive()
	 * @param ����SQL���
	 * @return ���ز�ѯ���JSONArray
	 */
	public JSONArray sqlQuery(String query) {
		JSONArray array = new JSONArray();
		final String sql = query;
		List list = (List) hibernateTemplate.execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException {
				return session.createSQLQuery(sql).list();
			}
		});
		for (Object obj : list) {
			// �ѵ���mapת����JSON����
			Object[] c = (Object[]) obj;
			JSONObject json = new JSONObject();
			for (int i = 0; i < c.length; i++) {
				try {
					json.put("col" + i, c[i]);
				} catch (JSONException e) {
					throw new WebApplicationException(400);
				}
			}
			array.put(json);
		}
		return array;
	}

	/**
	 * hql��ѯ������������saveTestSix()
	 * @param ����hql��ѯ���
	 * @return ���ز�ѯ���
	 */
	public List<Object> hqlQuery(String query) {
		List<Object> list = this.hibernateTemplate.find(query);
		return list;
	}

	/**
	 * hibernate��ҳ����ҳ�뼰ÿҳ���������ü�savetestseven()��ҳ���Ǵ�0��ʼ
	 */
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
			List<Object> list = query.setFirstResult(page * rows).setMaxResults(rows).list();
			return list;
		}
	}
}

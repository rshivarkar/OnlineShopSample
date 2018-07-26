using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication1.Controllers
{
    //public class User
    //{
    //    public User(string json)
    //    {
    //        JObject jObject = JObject.Parse(json);
    //        JToken jUser = jObject["user"];
    //        name = (string)jUser["name"];
    //        teamname = (string)jUser["teamname"];
    //        email = (string)jUser["email"];
    //        players = jUser["players"].ToArray();
    //    }

    //    public string name { get; set; }
    //    public string teamname { get; set; }
    //    public string email { get; set; }
    //    public Array players { get; set; }
    //}

    public class user
    {
        public string emailaddress { get; set; }

        public string password { get; set; }

        public long id { get; set; }
    }

    public class order
    {
        public List<cartData> cartData;
        public string customer { get; set; }

        public string shippingaddress { get; set; }

        //orderdate
    }

    public class cartData
    {
        public string price { get; set; }
        public string name { get; set; }

        public int qty { get; set; }
    }

    public class product
    {
        public string name { get; set; }

        public string category { get; set; }

        public string price { get; set; }

        public string label { get; set; }
    }

    public class ordermaster
    {
        public int id { get; set; }

        public int customerid { get; set; }

        public string shippingaddress { get; set; }

        public System.DateTime orderdate { get; set; }
    }

    public class ordermasterDetails
    {
        public int id { get; set; }

        public int customerid { get; set; }

        public string shippingaddress { get; set; }

        public string orderdate { get; set; }

        public List<orderdetails> objorderdetails = new List<orderdetails>();
    }

    public class orderdetails
    {
        public string name { get; set; }

        public decimal price { get; set; }

        public decimal qty { get; set; }
    }

    [EnableCors(origins: "http://localhost:7543", headers: "*", methods: "*")]
    public class Default1Controller : ApiController
    {
        public string get()
        {
            return "Rupesh";
        }

        private string sqlDatoToJson(MySqlDataReader dataReader)
        {
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(dataTable);
            return JSONString;
        }

        public object getproducts()
        {
            //System.Threading.Thread.Sleep(5000);

            using (MySqlConnection con = new MySqlConnection("host=localhost;user=root;password=weblogic;database=rajfresh;"))
            {
                string sql = @"SELECT * FROM rajfresh.testproduct;";

                con.Open();

                MySqlCommand cmd = new MySqlCommand(sql, con);

                MySqlDataReader reader = cmd.ExecuteReader();

                var dataTable = new DataTable();
                dataTable.Load(reader);

                IList<product> items = dataTable.AsEnumerable().Select(row =>
                   new product
                   {
                       name = row.Field<string>("name"),
                       price = row.Field<string>("price"),
                       category = row.Field<string>("category"),
                       label = row.Field<string>("name"),
                   }).ToList();

                return items.ToList();
            }
        }

        [HttpGet]
        [ActionName("GetOrderMaster")]
        public object GetOrderMaster(int customerid)
        {
            //System.Threading.Thread.Sleep(5000);

            using (MySqlConnection con = new MySqlConnection("host=localhost;user=root;password=weblogic;database=rajfresh;"))
            {
                string sql = @"select * from rajfresh.ordermaster where customerid = " + customerid + ";";

                con.Open();

                MySqlCommand cmd = new MySqlCommand(sql, con);

                MySqlDataReader reader = cmd.ExecuteReader();

                var dataTable = new DataTable();
                dataTable.Load(reader);

                IList<ordermaster> items = dataTable.AsEnumerable().Select(row =>
                   new ordermaster
                   {
                       id = row.Field<int>("id"),
                       customerid = row.Field<int>("customerid"),
                       shippingaddress = row.Field<string>("shippingaddress"),
                   }).ToList();

                return items.ToList();
            }
        }

        [HttpGet]
        [ActionName("GetOrderMasterDetails")]
        public object GetOrderMasterDetails(int customerid)
        {
            //System.Threading.Thread.Sleep(5000);

            using (MySqlConnection con = new MySqlConnection("host=localhost;user=root;password=weblogic;database=rajfresh;"))
            {
                string sql = @" select om.id,om.customerid, om.shippingaddress, om.orderdate, od.name, od.price, od.qty from rajfresh.ordermaster om,
                                    rajfresh.orderdetails od
                                 where om.customerid = " + customerid + " and " +
                                " om.id = od.orderid";

                con.Open();

                MySqlDataAdapter adp = new MySqlDataAdapter(sql, con);
                DataSet ds = new DataSet();
                adp.Fill(ds);

                DataTable dataTableDetails = ds.Tables[0];

                List<ordermasterDetails> items = new List<ordermasterDetails>();

                DataTable dtMaster = dataTableDetails.DefaultView.ToTable(true, "id");

                for (int ii = 0; ii < dtMaster.Rows.Count; ii++)
                {
                    ordermasterDetails objordermasterDetails = new ordermasterDetails();
                    DataRow[] orderdetailrows = dataTableDetails.Select("id=" + dtMaster.Rows[ii]["id"] + "");

                    objordermasterDetails.id = int.Parse(orderdetailrows[0]["id"].ToString());
                    objordermasterDetails.customerid = int.Parse(orderdetailrows[0]["customerid"].ToString());
                    objordermasterDetails.shippingaddress = orderdetailrows[0]["shippingaddress"].ToString();
                    objordermasterDetails.orderdate = System.DateTime.Parse(orderdetailrows[0]["orderdate"].ToString()).ToShortDateString();

                    foreach (DataRow dr in orderdetailrows)
                    {
                        orderdetails objorderdetail = new orderdetails();
                        objorderdetail.name = dr["name"].ToString();
                        objorderdetail.price = decimal.Parse(dr["price"].ToString());
                        objorderdetail.qty = decimal.Parse(dr["qty"].ToString());
                        objordermasterDetails.objorderdetails.Add(objorderdetail);
                    }

                    items.Add(objordermasterDetails);
                }

                return items.ToList();
            }
        }

        [HttpPost]
        [ActionName("PlaceOrder")]
        public void PlaceOrder(object orderdata)
        {
            order objorder = JsonConvert.DeserializeObject<order>(orderdata.ToString());

            //inser into ordermaster
            using (MySqlConnection con = new MySqlConnection("host=localhost;user=root;password=weblogic;database=rajfresh;"))
            {
                con.Open();

                //INSERT INTO `rajfresh`.`ordermaster` (`customerid`, `shippingaddress`) VALUES ('1', '1');
                string sqlinsertordermaster = @"INSERT INTO `rajfresh`.`ordermaster` (`customerid`, `shippingaddress`,`orderdate`) " +
                        "VALUES ('" + objorder.customer + "', '" + objorder.shippingaddress + "', '" + System.DateTime.Now.ToString("yyyy-MM-dd H:mm:ss") + "');";

                MySqlCommand cmd = new MySqlCommand(sqlinsertordermaster, con);

                cmd.ExecuteNonQuery();

                int id = (int)cmd.LastInsertedId;

                //insert into orderdetails
                //INSERT INTO `rajfresh`.`orderdetails` (`orderid`, `name`, `price`, `qty`) VALUES ('1', '1', '1', '1');

                for (int ii = 0; ii < objorder.cartData.Count; ii++)
                {
                    string sqlinsertorderdetails = @"INSERT INTO `rajfresh`.`orderdetails` (`orderid`, `name`, `price`, `qty`)
                                                VALUES ('" + id + "', '" + objorder.cartData[ii].name + "', '" + objorder.cartData[ii].price + "', '" + objorder.cartData[ii].qty + "');";

                    cmd = new MySqlCommand(sqlinsertorderdetails, con);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        [HttpPost]
        [ActionName("Register")]
        public bool Register(object userdata)
        {
            bool bRegister = false;

            try
            {
                user objuser = JsonConvert.DeserializeObject<user>(userdata.ToString());

                //inser into ordermaster
                using (MySqlConnection con = new MySqlConnection("host=localhost;user=root;password=weblogic;database=rajfresh;"))
                {
                    con.Open();

                    //INSERT INTO `rajfresh`.`user` (`emailaddress`, `password`) VALUES ('rshivarkar@gmail.com', 'test');
                    string sqlinsertordermaster = @"INSERT INTO `rajfresh`.`user` (`emailaddress`, `password`) VALUES ('" + objuser.emailaddress + "', '" + objuser.password + "');";

                    MySqlCommand cmd = new MySqlCommand(sqlinsertordermaster, con);

                    cmd.ExecuteNonQuery();

                    int id = (int)cmd.LastInsertedId;

                    bRegister = true;
                }
            }
            catch (System.Exception ex)
            {
                //log the exception
            }
            return bRegister;
        }

        [HttpPost]
        [ActionName("login")]
        public long login(object userdata)
        {
            long id = -1;

            try
            {
                user objuser = JsonConvert.DeserializeObject<user>(userdata.ToString());

                //inser into ordermaster
                using (MySqlConnection con = new MySqlConnection("host=localhost;user=root;password=weblogic;database=rajfresh;"))
                {
                    con.Open();

                    //SELECT * FROM rajfresh.user where emailaddress = 'rshivarkar@gmail.com' and password = 'test'
                    string sqllogin = @"SELECT * FROM rajfresh.user where emailaddress = '" + objuser.emailaddress + "' and password = '" + objuser.password + "'";
                    MySqlCommand cmd = new MySqlCommand(sqllogin, con);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        DataTable dataTable = new DataTable();
                        dataTable.Load(reader);
                        id = long.Parse(dataTable.Rows[0]["id"].ToString());
                    }

                    return id;
                }
            }
            catch (System.Exception ex)
            {
                //log the exception
            }
            return id;
        }

        [HttpPost]
        [ActionName("AddProductsPrices")]
        public void AddProductsPrices(object orderdata)
        {
            //productPrice objproductPrice = JsonConvert.DeserializeObject<productPrice>(orderdata.ToString());
        }
    }
}
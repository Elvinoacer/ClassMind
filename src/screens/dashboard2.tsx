import { FaRegEye } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { IoMdPeople, IoMdSettings } from "react-icons/io";
import { IoChatbubbleEllipses, IoSearchSharp } from "react-icons/io5";
import ImageSrc from "../assets/img/bg-card.png";

import { FaLock } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

import { MdMenu } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";
import { IoIosHome, IoMdHelp } from "react-icons/io";

export default function Dashboard2() {
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <Link href="#">
              <span className="icon">
                <FaApple />{" "}
              </span>
              <span className="title">Brand Name</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <IoIosHome />
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <IoMdPeople />
              </span>
              <span className="title">Customers</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <IoChatbubbleEllipses />
              </span>
              <span className="title">Messages</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <IoMdHelp />
              </span>
              <span className="title">Help</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <IoMdSettings />
              </span>
              <span className="title">Settings</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <FaLock />
              </span>
              <span className="title">Password</span>
            </Link>
          </li>

          <li>
            <Link href="#">
              <span className="icon">
                <IoMdLogOut />
              </span>
              <span className="title">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <MdMenu />
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <IoSearchSharp />
            </label>
          </div>

          <div className="user">
            <Image src={ImageSrc} alt="alt" fill />
          </div>
        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1,504</div>
              <div className="cardName">Daily Views</div>
            </div>

            <div className="iconBx">
              <FaRegEye />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">80</div>
              <div className="cardName">Sales</div>
            </div>

            <div className="iconBx">
              <MdOutlineShoppingCart />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">284</div>
              <div className="cardName">Comments</div>
            </div>

            <div className="iconBx">
              <IoChatbubbleEllipses />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">$7,842</div>
              <div className="cardName">Earning</div>
            </div>

            <div className="iconBx">
              <GiCash />
            </div>
          </div>
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Recent Orders</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Star Refrigerator</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td>
                    <span className="status delivered">Delivered</span>
                  </td>
                </tr>

                <tr>
                  <td>Dell Laptop</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>

                <tr>
                  <td>Apple Watch</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td>
                    <span className="status return">Return</span>
                  </td>
                </tr>

                <tr>
                  <td>Addidas Shoes</td>
                  <td>$620</td>
                  <td>Due</td>
                  <td>
                    <span className="status inProgress">In Progress</span>
                  </td>
                </tr>

                <tr>
                  <td>Star Refrigerator</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td>
                    <span className="status delivered">Delivered</span>
                  </td>
                </tr>

                <tr>
                  <td>Dell Laptop</td>
                  <td>$110</td>
                  <td>Due</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>

                <tr>
                  <td>Apple Watch</td>
                  <td>$1200</td>
                  <td>Paid</td>
                  <td>
                    <span className="status return">Return</span>
                  </td>
                </tr>

                <tr>
                  <td>Addidas Shoes</td>
                  <td>$620</td>
                  <td>Due</td>
                  <td>
                    <span className="status inProgress">In Progress</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Recent Customers</h2>
            </div>

            <table>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="ImageBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="ImageBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>

              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <Image src={ImageSrc} fill alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

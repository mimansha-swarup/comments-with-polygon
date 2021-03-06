const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Comments", function () {
  it("Should add and fetch succesdfully", async function () {
    const Comments = await ethers.getContractFactory("Comments");
    const comments = await Comments.deploy();
    await comments.deployed();

    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(0);
    
    const txt1= await comments.addComment(
      "my-first-blog-post",
      "its my first comment"
      );
    await txt1.wait();
    
    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("my-second-blog-post")).to.be.lengthOf(0);
    
    const txt2= await comments.addComment(
      "my-second-blog-post",
      "this comment is on diffrent thread but its my first comment there"
      );
    await txt2.wait();
      
    expect(await comments.getComments("my-first-blog-post")).to.be.lengthOf(1);
    expect(await comments.getComments("my-second-blog-post")).to.be.lengthOf(1);

  });
});

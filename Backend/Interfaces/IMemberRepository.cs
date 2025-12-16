using Backend.Entities;

namespace Backend.Interfaces;

public interface IMemberRepository
{
    void Update(Member member);     // 更新成员方法
    Task<bool> SaveAllAsync();     // 保存所有更改方法
    Task<IReadOnlyList<Member>> GetMembersAsync();  // 获取成员列表方法
    Task<Member?> GetMemberByIdAsync(string id);    // 根据成员 id 获取成员信息
    // 根据成员 ID 获取该成员的照片列表
    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(String memberId);
}